import { StoryObj, Meta, moduleMetadata } from '@storybook/angular';
import { AddListComponent } from './add-list.component';
import { fn } from '@storybook/test';
import { provideMockStore } from '@ngrx/store/testing';

const meta: Meta<AddListComponent> = {
    title: 'Components/Create list',
    component: AddListComponent,
    tags: ['autodocs'],
    args: {
        titleInput: '',
        boardId: 1,
        changeEditMode: fn()
    },
    decorators: [
        moduleMetadata({
            providers: [provideMockStore({})],
        }),
    ],
};

export default meta;
export const AddEditBoard: StoryObj<AddListComponent> = {};