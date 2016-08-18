import {assert} from 'chai';

import updater from '../../src/calendar/updater';

describe('Calendar initial model', () => {
    it('should return initial model with current date', () => {
        var date = new Date();
        var day = date.getDate();
        var month = date.getMonth();
        var year = date.getFullYear();
        var expectedModel = {
            selectedDay: day,
            selectedYear: year,
            selectedMonth: month,
            browsingMonth: month,
            browsingYear: year
        };
        assert.deepEqual(updater(), expectedModel);
    });
});

describe('Calendar operation', () => {
    var initModel = {
        selectedDay: 20,
        selectedYear: 2015,
        selectedMonth: 10,
        browsingYear: 2016,
        browsingMonth: 5
    };
    it('next month should set browsing month to the next month', () => {
        var expectedModel = {...initModel, browsingMonth: 6};
        var model = updater(initModel, {type: "NextMonth"});
        assert.deepEqual(model, expectedModel);
    });

    it('next month should not exceed maximal month', () => {
        var testModel = {...initModel, browsingMonth: 11};
        var expectedModel = {
            ...initModel,
            browsingMonth: 0,
            browsingYear: initModel.browsingYear + 1
        };
        var model = updater(testModel, {type: "NextMonth"});
        assert.deepEqual(model, expectedModel);
    });

    it('previous month should set browsing month to the previous month', () => {
        var expectedModel = {
            ...initModel,
            browsingMonth: initModel.browsingMonth - 1
        };
        var model = updater(initModel, {type: "PrevMonth"});
        assert.deepEqual(model, expectedModel);
    });

    it('previous month should not be negative', () => {
        var testModel = {...initModel, browsingMonth: 0};
        var expectedModel = {
            ...testModel,
            browsingMonth: 11,
            browsingYear: initModel.browsingYear - 1
        };
        var model = updater(testModel, {type: "PrevMonth"});
        assert.deepEqual(model, expectedModel);
    });
});

describe('Calendar model', () => {
    it('should contain selected date', () => {
        var initModel = {
            selectedDay: 10,
            selectedMonth: 10,
            selectedYear: 2020,
            browsingYear: 2012,
            browsingMonth: 1
        };
        var selectedDay = 2;
        var expectedModel = {
            ...initModel,
            selectedMonth: initModel.browsingMonth,
            selectedYear: initModel.browsingYear,
            selectedDay: selectedDay
        };
        var model = updater(initModel, {
            type: "DateChanged",
            selectedDay: selectedDay
        });
        assert.deepEqual(model, expectedModel);
    });
});
