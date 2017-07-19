import { checkFields, getErrorText, setField } from '../../../../src/shared/utils/formUtil';
import { expect } from 'chai';
import constants from '../../../../src/constants';

describe('formUtil', () => {
  describe('#checkFields', () => {

    it('valid when right params sent', () => {
      const fields = ['fieldName1', 'fieldName2'];
      const data = {
        fieldName1: {
          value: 'fieldName1',
        },
        fieldName2: {
          value: 'fieldName2',
        },
      };
      const response = checkFields(fields, data);

      expect(response.isValid).to.be.true;
      expect(response.data.fieldName1.touch).to.be.true;
      expect(response.data.fieldName1.valid).to.be.true;
      expect(response.data.fieldName2.touch).to.be.true;
      expect(response.data.fieldName2.valid).to.be.true;
    });

    it('invalid if at least one field is empty', () => {
      const fields = ['fieldName1', 'fieldName2'];
      const data = {
        fieldName1: {
          value: 'fieldName1',
        },
        fieldName2: {
          value: '',
        },
      };
      const response = checkFields(fields, data);

      expect(response.isValid).to.be.false;
      expect(response.data.fieldName1.touch).to.be.true;
      expect(response.data.fieldName1.valid).to.be.true;
      expect(response.data.fieldName2.touch).to.be.true;
      expect(response.data.fieldName2.valid).to.be.false;
    });

    it('invalids fields sent without value', () => {
      const fields = ['fieldName1', 'fieldName2', 'fieldName3'];
      const data = {
        fieldName1: {
          value: 'fieldName1',
        },
        fieldName2: {
          value: '',
        },
      };
      const response = checkFields(fields, data);

      expect(response.isValid).to.be.false;
      expect(response.data.fieldName1.touch).to.be.true;
      expect(response.data.fieldName1.valid).to.be.true;
      expect(response.data.fieldName2.touch).to.be.true;
      expect(response.data.fieldName2.valid).to.be.false;
      expect(response.data.fieldName3.touch).to.be.true;
      expect(response.data.fieldName3.valid).to.be.false;
    });

    it('invalid when no params are sent', () => {
      const response = checkFields();
      expect(response.isValid).to.be.false;
      expect(response.data).to.deep.equal({});
    });
  });

  describe('#setField', () => {

    it('valid when right params sent', () => {
      const event = {
        target: {
          name: 'name',
          value: 'value',
        },
      };
      const response = setField(event, {});

      expect(response.name.value).to.equal('value');
      expect(response.name.touch).to.be.true;
      expect(response.name.valid).to.be.true;
    });

    it('returns data sent if event not passed', () => {
      const data = {};
      const response = setField(null, data);

      expect(response).to.deep.equal(data);
    });

    it('invalids when value not sent', () => {
      const event = {
        target: {
          name: 'name',
          value: '',
        },
      };
      const response = setField(event, {});

      expect(response.name.value).to.equal('');
      expect(response.name.touch).to.be.true;
      expect(response.name.valid).to.be.false;
    });
  });

  describe('#getErrorText', () => {

    it('valid when fieldName is valid and has been touched', () => {
      const data = {
        fieldName1: {
          touch: true,
          valid: true,
        },
      };
      const response = getErrorText('fieldName1', data);

      expect(response).to.equal(null);
    });

    it('invalid when data not sent', () => {
      const response = getErrorText('fieldName1');

      expect(response).to.equal(constants.invalidText);
    });

    it('invalid when invalid data sent', () => {
      const response = getErrorText('fieldName1', 'invalid data');

      expect(response).to.equal(constants.invalidText);
    });

    it('invalid when fieldName is not valid and has been touched', () => {
      const data = {
        fieldName1: {
          touch: true,
          valid: false,
        },
      };
      const response = getErrorText('fieldName1', data);

      expect(response).to.equal(constants.invalidText);
    });

    it('invalid when fieldName hasnt been touched', () => {
      const data = {
        fieldName1: {
          touch: false,
        },
      };
      const response = getErrorText('fieldName1', data);

      expect(response).to.equal(constants.invalidText);
    });
  });

});
