import { assert } from 'chai';

import updater from '../../src/calendar/updater';
import moment from 'moment';

describe('Calendar initial model', () => {
    it('should return initial model with current date', () => {
        var date = new Date();
        var day = date.getDate();
        var month = date.getMonth();
        var year = date.getFullYear();
        var expectedModel = {sDay: day,
                             sYear: year,
                             sMonth: month,
                             bMonth: month,
                             bYear: year};
        assert.deepEqual(updater(), expectedModel);
    });

    // it('should set greeted flag when clicking SayHi', () => {
    //     let model = undefined;
    //     model = updater();
    //     model = updater(model, { type: 'SayHi' });
    //     assert.deepEqual(model, { greeted: true });
    // });
});