import { StoryObj, Meta, moduleMetadata, argsToTemplate } from '@storybook/angular';
import { MockStoreConfig, provideMockStore } from '@ngrx/store/testing';
import { ModalComponent } from './modal.component';

const initialState : MockStoreConfig<any> = {
    initialState: {}
}

export default {
    title: 'Components/Modal',
    component: ModalComponent,
    tags: ['autodocs'],
    decorators: [
        moduleMetadata({
            imports: [],
            providers: [provideMockStore(initialState)]
        })
    ],
    render: (args) => ({
    props: {
        ...args
    },
    template: `<app-modal ${argsToTemplate(args)}></app-modal>`
    })
} as Meta<ModalComponent>;

type ModalComponentStory = StoryObj<ModalComponent>;

export const Primary: ModalComponentStory = {
    args: {
        id: 1,
        name: "Learn programming",
        description: "This card component serves as a demonstration, illustrating its design and features within a simulated context, offering insight into its potential usage scenarios.",
        dueDate: "2024-05-30",
        priority: "High",
        list: "Completed"
    },
};