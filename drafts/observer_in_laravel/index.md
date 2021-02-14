# Observer in laravel
## Prerequisites
- Observer
- Laravel

## Summary
- Observer usage
  * Observer usage: event history
  * Observer usage: distance between event venue and fleet member area of operation

## Intro
We will dive into 2 examples in which we will expose one way of doing without

## Observer usage: event history
### The problem

### One solution
- add a if statement on event create, event update, area create, area update to compute distance between every event and area.
That wouldn't be DRY. We don't want to remote code at multiple place in the code base. That would increase the maintenance cost.
```php
<?php
// sorting function my colleague came up with
$direction = $descending ? 'DESC' : 'ASC';
        return DB::table('stores')
            ->select(DB::raw(
                '
                select * from (
                SELECT A.*,
        ROUND((
            3959 * acos( cos( radians(location_latitude) )
                * cos( radians(store_latitude) )
                * cos( radians(store_longitude) - radians(location_longitude)) + sin(radians(location_latitude))
                * sin( radians(store_latitude)))
        ), 3) AS distance
    FROM(

        select s.*,l.latitude location_latitude, l.longitude location_longitude,
           sa.latitude store_latitude, sa.longitude store_longitude
    from stores s , events_stores es , events e , locations l, store_areas sa
    where s.uuid = es.store_uuid and es.event_uuid=e.uuid
        and e.location_uuid=l.uuid
        and e.venue_uuid=l.venue_uuid and s.uuid=sa.store_uuid) as A) as B
                '
            )
                ->orderByRaw("B.distance ${$direction}"));
```
Unless you are hardcore coder

## Observer usage: distance between event venue and fleet member area of operation
### The problem
> As a staff, I can see the distance between an event VENUE ADDRESS and a fleet member AREA OF OPERATION

That is the user story but simply put it is about measuring the distance between two points

- Event
- Area
- AreaLocation
```php
<?php

namespace App\Models;

/**
 * Class AreaLocation
 * @package App\Models\Foodfleet
 *
 * @property string uuid
 * @property string location_uuid
 * @property string area_uuid
 * @property float distance
 *
 *
 * @property Location location
 * @property Area area
 */
class AreaLocation extends Model {
    public function location () {
        return $this->belongsTo(Location::class, 'location_uuid', 'uuid');
    }
    public function area () {
        return $this->belongsTo(Area::class);
    }
}

```
### One solution
#### With Observer
We will use TDD to assess the feature is working as expecting. Let's start by describing the expectations

- GPS Helper

1. When we create a new area it should calculate distance for all existing locations
```php
<?php
    public function testCreatingNewAreaCalculateDistanceForAllLocations()
    {
        /** @var Location[] $locations */
        $locations = factory(Location::class, 3)->create();
        $area = factory(Area::class)->create();
        foreach ($locations as $location) {
            /** @var AreaLocation $ae */
            $ae = AreaLocation::where('location_uuid', $location->uuid)
                ->where('area_uuid', $area->uuid)
                ->first();
            $this->assertNotNull($ae);
            $this->assertNotNull($ae->distance);
            $this->assertEquals(GPSHelper::distance(
                [$location->latitude, $location->longitude],
                [$area->latitude, $area->longitude]
            ), $ae->distance);
        }
    }
```

2. When we create a new location should calculate distance for all existing areas
```php
<?php
    public function testCreatingNewLocationCalculateDistanceForAllAreas()
    {
        /** @var Area[] $areas */
        $areas = factory(Area::class, 3)->create();
        $location = factory(Location::class)->create();
        foreach ($areas as $area) {
            /** @var AreaLocation $ae */
            $ae = AreaLocation::where('location_uuid', $location->uuid)
                ->where('area_uuid', $area->uuid)
                ->first();
            $this->assertNotNull($ae);
            $this->assertNotNull($ae->distance);
            $this->assertEquals(GPSHelper::distance(
                [$location->latitude, $location->longitude],
                [$area->latitude, $area->longitude]
            ), $ae->distance);
        }
    }
```
3 We don't want to create a new record in that association table when updating location details
```php
<?php
    public function testUpdatingAnythingExceptCoordinatesShouldNotCreateANewRecord()
    {
        /** @var Location $location */
        $location = factory(Location::class)->create();
        $area = factory(Area::class)->create();
        $count = AreaLocation::count();

        $location->update(array_diff_key(factory(Location::class)->make()->toArray(), ['latitude' => '', 'longitude' => '']));
        $this->assertEquals($count, AreaLocation::count());

        $area->update(array_diff_key(factory(Area::class)->make()->toArray(),
            ['latitude' => '', 'longitude' => '']));
        $this->assertEquals($count, AreaLocation::count());
    }
```
4. updating area coordinates update distance
```php
<?php

    public function testUpdatingAreaCoordinatesUpdateDistance()
    {
        $location = factory(Location::class)->create();
        $area = factory(Area::class)->create();
        /** @var AreaLocation $ae */
        $ae = AreaLocation::where('location_uuid', $location->uuid)
            ->where('area_uuid', $area->uuid)
            ->first();

        $previousDistance = $ae->distance;
        $newValue = $this->faker->latitude;
        $this->assertNotEquals($newValue, $area->latitude);
        $area->update([
            'latitude' => $newValue
        ]);
        $ae->refresh();
        $this->assertEquals(
            GPSHelper::distance(
                [$location->latitude, $location->longitude],
                [$area->latitude, $area->longitude]
            ),
            $ae->distance
        );
        $this->assertNotEquals($previousDistance, $ae->distance);

        $previousDistance = $ae->distance;
        $newValue = $this->faker->longitude;
        $this->assertNotEquals($newValue, $area->longitude);
        $area->update([
            'longitude' => $newValue
        ]);
        $ae->refresh();
        $this->assertNotEquals($previousDistance, $ae->distance);
    }
``` 
5. updating event coordinates update distance
```php
<?php

    public function testUpdatingLocationCoordinatesUpdateDistance()
    {
        $location = factory(Location::class)->create();
        $area = factory(Area::class)->create();
        /** @var AreaLocation $ae */
        $ae = AreaLocation::where('location_uuid', $location->uuid)
            ->where('area_uuid', $area->uuid)
            ->first();

        $previousDistance = $ae->distance;
        $newValue = $this->faker->latitude;
        $location->update([
            'latitude' => $newValue
        ]);
        $ae->refresh();
        $this->assertNotEquals($previousDistance, $ae->distance);
        $this->assertEquals(
            GPSHelper::distance(
                [$location->latitude, $location->longitude],
                [$area->latitude, $area->longitude]
            ),
            $ae->distance
        );

        $previousDistance = $ae->distance;
        $newValue = $this->faker->longitude;
        $this->assertNotEquals($newValue, $location->longitude);
        $location->update([
            'longitude' => $newValue
        ]);
        $ae->refresh();
        $this->assertEquals(
            GPSHelper::distance(
                [$location->latitude, $location->longitude],
                [$area->latitude, $area->longitude]
            ),
            $ae->distance
        );
        $this->assertNotEquals($previousDistance, $ae->distance);
    }
``` 
6. Deleting area remove record on the area_location association table
```php
<?php

    public function testDeletingAreaRemoveRecord()
    {
        $location = factory(Location::class)->create();
        $area = factory(Area::class)->create();
        $this->assertEquals(1, AreaLocation::where('location_uuid', $location->uuid)
            ->where('area_uuid', $area->uuid)
            ->count());
        $area->delete();
        $this->assertEquals(0, AreaLocation::where('location_uuid', $location->uuid)
            ->where('area_uuid', $area->uuid)
            ->count());
    }
```

7. Deleting location remove record on the area_location association table
```php
<?php
    public function testDeletingLocationRemoveRecord()
    {
        $location = factory(Location::class)->create();
        $area = factory(Area::class)->create();
        $this->assertEquals(1, AreaLocation::where('location_uuid', $location->uuid)
            ->where('area_uuid', $area->uuid)
            ->count());
        $location->delete();
        $this->assertEquals(0, AreaLocation::where('location_uuid', $location->uuid)
            ->where('area_uuid', $area->uuid)
            ->count());
    }
```

- Implementation.
  * Create model
  `php artisan make:model Models/AreaLocation`
  ```php
  <?php
        
        namespace App\Models\Foodfleet;
        
        use App\Helpers\GPSHelper;
        use App\Models\Model;
        use Dyrynda\Database\Support\GeneratesUuid;
        
        /**
         * Class AreaLocation
         * @package App\Models\Foodfleet
         *
         * @property string uuid
         * @property string event_uuid
         * @property string area_uuid
         * @property float distance
         *
         *
         * @property Event event
         * @property Area area
         */
        class AreaLocation extends Model {
            use GeneratesUuid;
        
            protected $table = 'area_location';
            protected $primaryKey = 'uuid';
            protected $keyType = 'string';
            public $incrementing = false;
            public $timestamps = false;
            protected $guarded = ['uuid'];
        
            public function event () {
                return $this->belongsTo(Event::class, 'event_uuid', 'uuid');
            }
        
            public function area () {
                return $this->belongsTo(Area::class, 'area_uuid', 'uuid');
            }
        
            public static function computeDistance (Location $location, Area $area) {
                return self::updateOrCreate([
                    'location_uuid' => $location->uuid,
                    'area_uuid' => $area->uuid,
                ], [
                    'distance' => GPSHelper::distance(
                        [ $location->latitude, $location->longitude ],
                        [ $area->latitude, $area->longitude ]
                    )
                ]);
            }
        }
  ```
  * Create migration
  `php artisan make:migration CreateAreaLocationTable --create=area_location`
  * Migration Defined as follow
  ```php
  <?php
  ```
  * Create observers
  `php artisan make:observer AreaObserver`
  `php artisan make:observer LocationObserver`
  * Bind the observer by adding the following line in your `EventServiceProvider`
  ```php
  <?php
        public function boot () {
          Area::observe(AreaObserver::class);
          Event::observe(EventObserver::class);
        }
  ```
  * `AreaObserver` defined as follow
    ```php
    <?php
    
    namespace App\Observers;
    
    use App\Models\Area;
    
    class AreaObserver
    {
        public function created (StoreArea $area) {
            Location::chunk(200, function ($locations) use ($area) {
                foreach ($locations as $location) {
                    AreaLocation::computeDistance($location, $area);
                }
            });
        }
    
        public function updated (StoreArea $area) {
            if ($area->isDirty(['latitude', 'longitude'])) {
                Location::chunk(200, function ($locations) use ($area) {
                    foreach ($locations as $location) {
                        AreaLocation::computeDistance($location, $area);
                    }
                });
            }
        }
    
        public function deleted (StoreArea $area) {
            AreaLocation::where('area_uuid', $area->uuid)->delete();
        }
    }
    
    ```
  Notice how we are not retrieving all locations in once chunking them to optimize memory usage
  
  * `LocationObserver` defined as follow
  ```php
  <?php
  
      namespace App\Observers;
      
      use App\Models\Foodfleet\Event;
      
      class LocationObserver
      {
            
        public function created(Location $location)
        {
            StoreArea::chunk(200, function ($areas) use ($location) {
                foreach ($areas as $area) {
                    AreaLocation::computeDistance($location, $area);
                }
            });
        }
    
        public function updated(Location $location)
        {
            if ($location->isDirty(['latitude', 'longitude'])) {
                StoreArea::chunk(200, function ($areas) use ($location) {
                    foreach ($areas as $area) {
                        AreaLocation::computeDistance($location, $area);
                    }
                });
            }
        }
    
        public function deleted(Location $location)
        {
            AreaLocation::where('location_uuid', $location->uuid)->delete();
        }
      }
  ```

## Wrap up
Unless you are a hardcore developer I don't see why you wouldn't use observer. Laravel has one of the best docs if not the best.
Notice how I am describe _the_ problem and explaining _a_ solution but not _the_ solution. There are multiple ways of achieving the same goal.
Hit me up if you have any questions I am available on twitter as @babacarcissedia

## Resources
- [Laravel observer]() 
