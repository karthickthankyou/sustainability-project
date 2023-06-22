import React from 'react'
import { ComponentStory, ComponentMeta } from '@storybook/react'
import { SustainabilityScore } from './SustainabilityScore'

export default {
  title: 'src/components/organisms/SustainabilityScore',
  component: SustainabilityScore,
} as ComponentMeta<typeof SustainabilityScore>

const Template: ComponentStory<typeof SustainabilityScore> = (args) => (
  <SustainabilityScore {...args} />
)

export const Primary = Template.bind({})
Primary.args = {}
Primary.parameters = {}
