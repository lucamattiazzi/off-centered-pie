import React, { FC } from 'react'
import { Meta, Story } from '@storybook/react';
import { buildSlices, Slice } from '../src';
const hueGenerator = require('hue-generator')

const SIDE = 100
const RADIUS = SIDE / 2

interface Props {
  x: 0
  y: 0
}

function buildPath (slice: Slice, radius: number): string {
  const largeArc = slice.beta - slice.alpha > Math.PI ? 1 : 0
  const M = `M ${radius + slice.center[0]} ${radius + slice.center[1]}`
  const L = `L ${radius + radius * Math.cos(slice.alpha)} ${radius + radius * Math.sin(slice.alpha)}`
  const A = `A ${radius} ${radius} 0 ${largeArc} 1 ${radius + radius * Math.cos(slice.beta)} ${radius + radius * Math.sin(slice.beta)}`
  return `${M} ${L} ${A} Z`
}

const Pie: FC<Props> = (p) => {
  const centerAngle = Math.atan2(p.y, p.x)
  const maxX = Math.cos(centerAngle) * RADIUS * 0.9 // center should not get too close to circumference
  const maxY = Math.sin(centerAngle) * RADIUS * 0.9 // center should not get too close to circumference
  
  const x = Math.sign(p.x) * Math.min(Math.abs(maxX), Math.abs(p.x))
  const y = Math.sign(p.y) * Math.min(Math.abs(maxY), Math.abs(p.y))
  const center = [x, y]
  const values = [1, 2, 3, 4]
  const slices = buildSlices(center, RADIUS, values)
  const colorGenerator = hueGenerator(50, 50) as { next: () => string }
  const slicesWithColor = slices.map(s => ({ ...s, color: colorGenerator.next() }))

  return (
    <div>
      <svg height="200" width="200" viewBox={`0 0 ${SIDE} ${SIDE}`}>
        <circle r={RADIUS} cx={RADIUS} cy={RADIUS} fill="blue" />
        { slicesWithColor.map(s => <path key={buildPath(s, RADIUS)} d={buildPath(s, RADIUS)} fill={s.color} />) }
      </svg>
    </div>
  )
}


const meta: Meta = {
  title: 'Off center Pie',
  component: Pie,
  argTypes: {
    x: {
      defaultValue: 0,
      control: {
        type: 'number',
        min: -50,
        max: 50,
      },
    },
    y: {
      defaultValue: 0,
      control: {
        type: 'number',
        min: -50,
        max: 50,
      }
    }
  },
  parameters: {
    controls: { expanded: true },
  },
};

export default meta;

const Template: Story<Props> = args => <Pie {...args} />;

export const Default = Template.bind({});

Default.args = {};
