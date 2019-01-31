import Vue from 'vue';
import Modal from '../src/components/Modal';
import { mount } from '@vue/test-utils';

describe('Modal Component', () => {
  const wrapper = mount(Modal, {
    propsData: {
      title: "Add Transaction",
      actionButtonText: 'Submit',
    },
    slots: {
      default: `<input type="text" />`
    }
  });

  it('renders correctly without errors', () => {
    expect(wrapper).toMatchSnapshot()
  });

  it('should display the appropriate title for the modal button', () => {
    const title = wrapper.find('button');
    expect(title.text()).toContain('Add Transaction')
  });

  it('should change isVisible to true and open modal when button is clicked', () => {
    expect(wrapper.vm.isVisible).toBe(false);
    expect(wrapper.find('.modal-content').exists()).toBe(false);


    const button = wrapper.find('button');
    button.trigger('click');

    expect(wrapper.vm.isVisible).toBe(true);
    expect(wrapper.find('.modal-content').exists()).toBe(true);
  });

  it('should display the content in the slot when modal opens', () => {
    expect(wrapper.find('.modal-content').findAll('input').length).toBe(1);
  });

  it('should change isVisible to false and close the modal', () => {
    expect(wrapper.vm.isVisible).toBe(true);

    const closeButton = wrapper.find('.close-modal');
    closeButton.trigger('click');

    expect(wrapper.vm.isVisible).toBe(false);
  });
})