import type { Meta, StoryObj } from '@storybook/react'
import {MyButton} from '../index';
import '../myButton/button.css'


const meta = {
  title: 'Components/MyButton',
  component: MyButton,

} satisfies Meta<typeof MyButton>

export default meta
type Story = StoryObj<typeof meta>

export const MyButtonStory: Story = {
  args: {
    color: 'gray',
    children: 'gey',
    big: true
  },
}
