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
  it('getDatesWithTraining() - should get dates for trained words', () => {
    let storage = jasmine.createSpyObj<StorageService>(['get']);
    let history = new HistoryService(storage);

    let days = new Set<number>();
    days.add(111);
    days.add(222);
    days.add(333);

    storage.get.and.returnValue(days);

    let result = history.getDatesWithTraining();

    expect(storage.get).toHaveBeenCalledTimes(1);
    expect(result).toEqual(days);
  })

  it('getDatesWithTraining() - should get new Set if there are not trained words in the storage ', () => {
    let storage = jasmine.createSpyObj<StorageService>(['get']);
    let history = new HistoryService(storage);

    storage.get.and.returnValue(null);

    let result = history.getDatesWithTraining();

    expect(storage.get).toHaveBeenCalledTimes(1);
    expect(result).toEqual(new Set<number>());
  })

  it('addDatesWithNewWords() - should add date to the storage if a word is trained', function () {
    let storage = jasmine.createSpyObj<StorageService>(['set', "get"]);
    let history = new HistoryService(storage);

    let dates = new Set<number>();
    dates.add(111);
    dates.add(222);
    dates.add(333);

    storage.get.and.returnValue(dates);

    history.addDatesWithNewWords(444);

    let expectation = new Set<number>();
    expectation.add(111);
    expectation.add(222);
    expectation.add(333);
    expectation.add(444);

    expect(storage.set).toHaveBeenCalledWith("startLearning", expectation);
  });

  it('getDatesWithNweWords() - should get dates for new words', function () {
    let storage = jasmine.createSpyObj<StorageService>(["get"]);
    let history = new HistoryService(storage);

    let dates = new Set<number>();
    dates.add(111);
    dates.add(222);
    dates.add(333);

    storage.get.and.returnValue(dates);

    let result = history.getDatesWithNweWords();

    expect(storage.get).toHaveBeenCalledTimes(1);
    expect(result).toEqual(dates);
  });


  it('getDatesWithNweWords() - should get new Set if there are not dates for new words in the storage', function () {
    let storage = jasmine.createSpyObj<StorageService>(["get"]);
    let history = new HistoryService(storage);

    storage.get.and.returnValue(null);

    let result = history.getDatesWithNweWords();

    expect(storage.get).toHaveBeenCalledTimes(1);
    expect(result).toEqual(new Set<number>());
  });

});
