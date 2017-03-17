import React, { Component } from 'react';
import Count from 'countup.js';

export const startAnimation = (component) => {
  if (component && component.spanElement) {
    const {
      decimal,
      decimals,
      duration,
      easingFn,
      end,
      onComplete,
      onStart,
      prefix,
      separator,
      start,
      suffix,
      useEasing,
      useGrouping
    } = component.props;

    const countupInstance = new Count(
      component.spanElement,
      start,
      end,
      decimals,
      duration,
      {
        decimal,
        easingFn,
        separator,
        prefix,
        suffix,
        useEasing,
        useGrouping
      }
    );

    if (typeof onStart === 'function') {
      onStart();
    }

    countupInstance.start(onComplete);
  } else {
    throw new Error(
      'You need to pass the CountUp component as an argument!\neg. this.myCountUp.startAnimation(this.myCountUp);'
    );
  }
};

/**
 * Component
 */
export default class CountUp extends Component {
  componentDidMount() {
    startAnimation(this);
  }

  shouldComponentUpdate(nextProps) {
    const hasCertainPropsChanged = this.props.duration !== nextProps.duration ||
      this.props.end !== nextProps.end ||
      this.props.start !== nextProps.start;

    return nextProps.redraw || hasCertainPropsChanged;
  }

  componentDidUpdate() {
    startAnimation(this);
  }

  render() {
    const { className, start, style } = this.props;

    return (
      <span className={className} style={style}>
        {start}
      </span>
    );
  }
}

CountUp.defaultProps = {
    className: undefined,
    decimal: '.',
    decimals: 0,
    duration: 3,
    easingFn: undefined,
    end: 100,
    onComplete: undefined,
    onStart: undefined,
    prefix: '',
    separator: ',',
    start: 0,
    suffix: '',
    redraw: false,
    style: undefined,
    useEasing: true,
    useGrouping: false
  };