import { Component, ChangeDetectorRef } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { filter, map, Observable, Subscription, tap, catchError, of, switchMap, debounceTime, distinctUntilChanged } from 'rxjs';

@Component({
  imports: [RouterOutlet],
  selector: 'app-root',
  styleUrl: './app.css',
  templateUrl: './app.html',
})
export class App {
   message: string = '';
   delayedMessage: string = '';
   count: number = 0;
   counterSubscription?: Subscription;
   searchText: string = '';

  constructor(private cdr: ChangeDetectorRef){}

   myObservable =  new Observable<string>((observer)=>{
      observer.next("(1st Obserbver next)Welcome to 1st  observer next.");
      observer.next("(2nd Observer) We are learning RxJS");
      observer.complete();
   });

   mySetTimeoutObservable = new Observable<string>((observer)=>{
   setTimeout(()=>{observer.next('First Message!')},1000),
   setTimeout(() => {observer.next('Second Message')}, 2000);
   setTimeout(()=>{observer.complete();},3000);
    
   });


   showMessage(): void{
    this.myObservable.subscribe(
      {
      next: (data)=>
      {
        this.message +=data+ ' ';
        console.log('Data Received: ', data)
      },
    error: (error)=>
      {
        console.log('Error Received: ', error);
      },
    complete: ()=>
      {
        console.log('Observable Completed! ')
      }
    });
   }

   loadDelayedMessage(): void{
    this.mySetTimeoutObservable.subscribe({next:(data)=>
      {
        this.delayedMessage += data +' ';
        console.log('Data Recieved: ', data)
      }, 
    error:(error)=>
    {
        console.log('Error Recieved: ', error);
    }, 
    complete: ()=>
    {
      console.log('Observable Completed!');
    }});
   }

   startCounter(): void{
    if (this.counterSubscription && !this.counterSubscription) {
      return;
    }

    const counter = new Observable<number>((observer)=>{
      let num: number = 1;

      const timer = setInterval(()=>{
        observer.next(num++);
      },1000);

      return ()=>{
        clearInterval(timer);
        console.log("counter stopped!");
      };
    });
    this.counterSubscription = counter.subscribe((value)=>{
      this.count = value;
      this.cdr.detectChanges();
    })
   }

   stopCounter(): void{
    this.counterSubscription?.unsubscribe();
   }

   showMapExample(): void{
    const numbers= new Observable<number>((observer)=>{
      observer.next(1);
      observer.next(2);
      observer.next(3);
      observer.next(4);
      observer.next(5);
      observer.next(6);
      observer.next(7);
      observer.next(8);
      observer.next(9);
      observer.next(10);
      observer.next(11);
      observer.next(12);
      observer.complete();
   })

   numbers.pipe(
        map((number)=>number*10)).subscribe((value)=>{console.log(value); });

  }

  showFilterExample(): void{
    const numbers= new Observable<number>((observer)=>{
      observer.next(1);
      observer.next(2);
      observer.next(3);
      observer.next(4);
      observer.next(5);
      observer.next(6);
      observer.next(7);
      observer.next(8);
      observer.next(9);
      observer.next(10);
      observer.next(11);
      observer.next(12);
      observer.complete();
   })

   numbers.pipe(filter((number)=>number%2==0)).subscribe((value)=>{console.log(value); });
  }

  combineExample(): void{
    const numbers= new Observable<number>((observer)=>{
      observer.next(1);
      observer.next(2);
      observer.next(3);
      observer.next(4);
      observer.next(5);
      observer.next(6);
      observer.next(7);
      observer.next(8);
      observer.next(9);
      observer.next(10);
      observer.next(11);
      observer.next(12);
      observer.complete();
   })

   numbers.pipe(filter((number)=>number%2==0),map((num)=>num*10)).subscribe((value)=>{console.log(value); });
  }

  showTapExample(): void {
  const numbers = new Observable<number>((observer) => {
    observer.next(10);
    observer.next(20);
    observer.next(30);
    observer.complete();
  });

  numbers.pipe(
    tap((number) => {
      console.log('Received:', number);
    })
  ).subscribe((value) => {
    console.log('Subscribed:', value);
  });
}

showErrorExample(): void {
  const numbers = new Observable<number>((observer) => {
    observer.next(10);
    observer.error('Something went wrong!');
  });

  numbers.pipe(
    catchError((error) => {
      console.log('Error caught:', error);
      throw error;
    })
  ).subscribe({
    next: (value) => {
      console.log('Value:', value);
    },
    error: (error) => {
      console.log('Subscription error:', error);
    }
  });
}

  showFallbackExample(): void {
  const numbers = new Observable<number>((observer) => {
    observer.next(10);
    observer.error('Something went wrong!');
  });

  numbers.pipe(
    catchError((error) => {
      console.log('Error caught:', error);
      return of(0);
    })
  ).subscribe({
    next: (value) => {
      console.log('Value:', value);
    },
    complete: () => {
      console.log('Observable completed');
    }
  });
}

  showSwitchMapExample(): void{
    const names = of('Ashish', 'Priya', 'Rahul');

    names.pipe(
      switchMap((name)=> of('Hello',name))).subscribe((message)=>console.log(message)
    );

  }

  showSwitchMapCancellation(): void {
  const searches = new Observable<string>((observer) => {
    observer.next('Ashish');

    setTimeout(() => {
      observer.next('Rahul');
    }, 1000);

    setTimeout(() => {
      observer.complete();
    }, 1500);
  });

  searches.pipe(
    switchMap((name) => {
      return new Observable<string>((observer) => {
        console.log('Started:', name);

        const timer = setTimeout(() => {
          observer.next('Result: ' + name);
          observer.complete();
        }, 2000);

        return () => {
          clearTimeout(timer);
          console.log('Cancelled:', name);
        };
      });
    })
  ).subscribe((result) => {
    console.log(result);
  });
}

  showDebounceExample(): void{
    const searchInput = new Observable<string>((observer)=>{
      observer.next('A');
       console.log("An Arrives");

      setTimeout(()=>{
        observer.next('An');
        console.log("An Arrives");
      },200);

      setTimeout(()=>{
        observer.next("Ash");
         console.log("An Arrives");
      },400);

      setTimeout(()=>{observer.complete()},1500)

    });

    searchInput.pipe(debounceTime(500)).subscribe((value)=>console.log("Search: ", value));
  }

  showDistinctUntillChangedExample():void{
    const numbers = of(10, 20, 20, 30, 30, 30, 40, 40, 40, 40, 50, 50, 50, 50, 50, 50);

    numbers.pipe(distinctUntilChanged()).subscribe((value)=> console.log("Value: ", value));
  }
}