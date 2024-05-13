import type {Meta, StoryObj} from '@storybook/angular';
import { InputComponent } from './input.component';

export default {
    title: 'Components/Input',
    component: InputComponent,
    tags: ['autodocs'],
    render: (args: InputComponent) => ({
        props: {
            ...args,
        }
    })
} as Meta<InputComponent>;

type InputComponentStory = StoryObj<InputComponent>;

export const Primary: InputComponentStory = {
    args: {
        placeholder: 'Primary'
    }
};

export const Secondary: InputComponentStory = {
    args: {
        placeholder: 'Secondary'
    }
}