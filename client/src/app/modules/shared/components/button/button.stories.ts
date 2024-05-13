import type {Meta, StoryObj} from '@storybook/angular';
import { ButtonComponent } from './button.component';

export default {
    title: 'Components/Button',
    component: ButtonComponent,
    tags: ['autodocs'],
    render: (args: ButtonComponent) => ({
        props: {
            ...args,
        }
    })
} as Meta<ButtonComponent>;

type ButtonComponentStory = StoryObj<ButtonComponent>;

export const Primary: ButtonComponentStory = {
    args: {
        label: 'Primary'
    }
};

export const Secondary: ButtonComponentStory = {
    args: {
        label: 'Secondary'
    }
}