import { StoryObj, Meta, moduleMetadata, argsToTemplate } from '@storybook/angular';
import { MockStoreConfig, provideMockStore } from '@ngrx/store/testing';
import { ActivityComponent } from './activity.component';

const initialstate : MockStoreConfig<any> = {
    initialState: {}
}

export default {
    title: 'Components/Activity',
    component: ActivityComponent,
    tags: ['autodocs'],
    decorators: [
        moduleMetadata({
            imports: [],
            providers: [provideMockStore(initialstate)]
        })
    ],
    render: (args) => ({
    props: {
        ...args
    },
    template: `<app-activity ${argsToTemplate(args)}></app-activity>`
    })
} as Meta<ActivityComponent>;

type ActivityComponentStory = StoryObj<ActivityComponent>;

export const Primary: ActivityComponentStory = {
    args: {
        cardName: 'Learn TypeScript', 
        activityName: 'changed the priority',
        previousValue: 'Medium',
        updatedValue: 'Low',
        date: new Date('2024-06-12'),
        listName: 'In progress'
    },
};