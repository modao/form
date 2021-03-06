/* eslint-disable no-undef, react/prop-types, react/no-multi-comp */

import React from 'react';
import { mount } from 'enzyme';
import createForm from '../src/createForm';

describe('setFieldsValue', () => {
  // https://github.com/ant-design/ant-design/issues/8386
  it('should work even set with undefined name', () => {
    const Test = createForm({ withRef: true })(
      class extends React.Component {
        componentDidMount() {
          this.props.form.setFieldsValue({
            normal: '2',
            inexist: 'oh',
          });
        }

        render() {
          const { getFieldProps } = this.props.form;
          return <input {...getFieldProps('normal', { initialValue: '1' })} />;
        }
      }
    );
    const wrapper = mount(<Test />);
    const form = wrapper.ref('wrappedComponent').props.form;
    expect(form.getFieldValue('normal')).toBe('2');
  });
});
