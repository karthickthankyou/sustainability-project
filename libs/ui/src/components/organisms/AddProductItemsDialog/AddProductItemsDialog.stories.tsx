import React from 'react'
import { ComponentStory, ComponentMeta } from '@storybook/react'
import { AddProductItemsDialog } from './AddProductItemsDialog'

export default {
  title: 'src/components/organisms/AddProductItemsDialog',
  component: AddProductItemsDialog,
} as ComponentMeta<typeof AddProductItemsDialog>

const Template: ComponentStory<typeof AddProductItemsDialog> = (args) => (
  <AddProductItemsDialog {...args} />
)

export const Primary = Template.bind({})
Primary.args = {}
Primary.parameters = {}
