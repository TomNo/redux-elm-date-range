import {assert} from 'chai';

import updater from '../../src/calendar/updater';

describe('Calendar initial model', () => {
    it('should return initial model with current date', () => {
        var date = new Date();
        var day = date.getDate();
        var month = date.getMonth();
        var year = date.getFullYear();
        var expectedModel = {
            sDay: day,
            sYear: year,
            sMonth: month,
            bMonth: month,
            bYear: year
        };
        assert.deepEqual(updater(), expectedModel);
    });
});

describe('Calendar operation', () => {
    var initModel = {sDay: 20, sYear: 2015, sMonth: 10, bYear: 2016, bMonth: 5};
    it('next month should set browsing month to the next month', () => {
        var expectedModel = {...initModel, bMonth: 6};
        var model = updater(initModel, {type: "NextMonth"});
        assert.deepEqual(model, expectedModel);
    });

    it('next month should not exceed maximal month', () => {
        var testModel = {...initModel, bMonth: 11};
        var expectedModel = {
            ...initModel,
            bMonth: 0,
            bYear: initModel.bYear + 1
        };
        var model = updater(testModel, {type: "NextMonth"});
        assert.deepEqual(model, expectedModel);
    });

    it('previous month should set browsing month to the previous month', () => {
        var expectedModel = {...initModel, bMonth: initModel.bMonth - 1};
        var model = updater(initModel, {type: "PrevMonth"});
        assert.deepEqual(model, expectedModel);
    });

    it('previous month should not be negative', () => {
        var testModel = {...initModel, bMonth: 0};
        var expectedModel = {
            ...testModel,
            bMonth: 11,
            bYear: initModel.bYear - 1
        };
        var model = updater(testModel, {type: "PrevMonth"});
        assert.deepEqual(model, expectedModel);
    });
});

describe('Calendar model', () => {
    it('should contain selected date', () => {
        var initModel = {
            sDay: 10,
            sMonth: 10,
            sYear: 2020,
            bYear: 2012,
            bMonth: 1
        };
        var selectedDay = 2;
        var expectedModel = {
            ...initModel,
            sMonth: initModel.bMonth,
            sYear: initModel.bYear,
            sDay: selectedDay
        };
        var model = updater(initModel, {
            type: "DateChanged",
            sDay: selectedDay
        });
        assert.deepEqual(model, expectedModel);
    });
});
