import {TestBed} from '@angular/core/testing';

import {HistoryService} from './history.service';
import {StorageService} from "./storage.service";

describe('HistoryService', () => {
  let service: HistoryService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(HistoryService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });

  it("addDateWithTraining() -should add date for training words to storage",  ()=>{
    let storage = jasmine.createSpyObj<StorageService>(['set', "get"]);
    let history= new HistoryService(storage);

    let  days= new Set<number>();
    days.add(111);
    days.add(222);
    days.add(333);

    storage.get.and.returnValue(days);

    history.addDateWithTraining(444);

    let expectation = new Set<number>();
    expectation.add(111);
    expectation.add(222);
    expectation.add(333);
    expectation.add(444);

    expect(storage.set).toHaveBeenCalledWith("learned", expectation);
  });
    it('getDatesWithTraining() - should get dates for trained words', function () {
      let storage = jasmine.createSpyObj<StorageService>(['get']);
      let history= new HistoryService(storage);

      let  days= new Set<number>();
      days.add(111);
      days.add(222);
      days.add(333);

      let prediction= storage.get.and.returnValue(days);

     let result= history.getDatesWithTraining();

      expect(storage.get).toHaveBeenCalledTimes(1);
      expect(result).toEqual(prediction);
  })
});
