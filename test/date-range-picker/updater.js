import {assert} from 'chai';

import updater from '../../src/date-range-picker/updater';

describe('Date range picker', () => {
    var fromDate = {
        selectedDay: 20,
        selectedYear: 2015,
        selectedMonth: 10};
    fromDate.browsingYear = fromDate.selectedYear;
    fromDate.browsingMonth = fromDate.selectedMonth;

    var toDate = {...fromDate};
    var model = {
        from: fromDate,
        to: toDate,
        previousFromSelection: fromDate,
        previousToSelection: toDate,
        rangeError: false
    };

    it('should not set to date sooner than from date.',
        () => {
            var testModel = {...model};
            testModel.toDate = testModel.fromDate - 1;
            var expectedModel = {...testModel, rangeError: true};
            var actualModel = updater(testModel, {
                type: "To.DateChanged",
                selectedDay: fromDate.selectedDay - 1
            });
            assert.deepEqual(actualModel, expectedModel);
        });

    it('should not set from date later than to date.',
        () => {
            var testModel = {...model};
            var expectedModel = {...testModel, rangeError: true};
            var actualModel = updater(testModel, {
                type: "From.DateChanged",
                selectedDay: toDate.selectedDay + 1
            });
            assert.deepEqual(actualModel, expectedModel);
        });
});

