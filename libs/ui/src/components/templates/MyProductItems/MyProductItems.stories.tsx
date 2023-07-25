import React from 'react'
import { ComponentStory, ComponentMeta } from '@storybook/react'
import { MyProductItems } from './MyProductItems'

export default {
  title: 'src/components/templates/MyProductItems',
  component: MyProductItems,
} as ComponentMeta<typeof MyProductItems>

const Template: ComponentStory<typeof MyProductItems> = (args) => (
  <MyProductItems {...args} />
)

export const Primary = Template.bind({})
Primary.args = {}
Primary.parameters = {}
