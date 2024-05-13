import { StoryObj, Meta, moduleMetadata, argsToTemplate } from '@storybook/angular';
import { MockStoreConfig, provideMockStore } from '@ngrx/store/testing';
import { CardComponent } from './card.component';

const initialState : MockStoreConfig<any> = {
    initialState: {}
}

export default {
    title: 'Components/Card',
    component: CardComponent,
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
    template: `<app-card ${argsToTemplate(args)}></app-card>`
    })
} as Meta<CardComponent>;

type CardComponentStory = StoryObj<CardComponent>;

export const Primary: CardComponentStory = {
    args: {
        id: 1,
        name: "Example card",
        description: "This card component is displayed as an example, showcasing its appearance and functionality in a mock environment.",
        dueDate: "2024-06-30",
        priority: "Medium",
        list: "Done", 
        listId: 1,
        boardId: 1,
        lists: [{id: 1, name: "Done"}, {id: 2, name: "In progress"}, {id: 3, name: "Plan to do"}],
        rightContextMenu: false,
        priorities: ['Low', 'Medium', 'High']
    },
};