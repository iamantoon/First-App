import { StoryObj, Meta, moduleMetadata } from '@storybook/angular';
import { EditListComponent } from './edit-list.component';
import { fn } from '@storybook/test';
import { provideMockStore } from '@ngrx/store/testing';

const meta: Meta<EditListComponent> = {
    title: 'Components/Edit list',
    component: EditListComponent,
    tags: ['autodocs'],
    args: {
        initialName: '',
        boardId: 2,
        name: 'Initial list name',
        id: 1,
        changeEditMode: fn()
    },
    decorators: [
        moduleMetadata({
            providers: [provideMockStore({})],
        }),
    ],
};

type EditListComponentStory = StoryObj<EditListComponent>;

export const Primary: EditListComponentStory = {
    args: {
        initialName: 'Initial list name',
        name: 'Initial list name'
    }
};

export default meta;
export const AddEditBoard: StoryObj<EditListComponent> = {};