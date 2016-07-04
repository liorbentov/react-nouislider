import React from 'react';
import nouislider from 'nouislider-algolia-fork';

class Nouislider extends React.Component {
  componentDidMount() {
    if (this.props.disabled) this.sliderContainer.setAttribute('disabled', true);
    else this.sliderContainer.removeAttribute('disabled');
    this.createSlider();
  }

  componentDidUpdate() {
    if (this.props.disabled) this.sliderContainer.setAttribute('disabled', true);
    else this.sliderContainer.removeAttribute('disabled');
    this.slider.destroy();
    this.createSlider();
  }

  componentWillUnmount() {
    this.slider.destroy();
  }

  createSlider() {
    var slider = this.slider = nouislider.create(this.sliderContainer, {...this.props});

    if (this.props.onUpdate) {
      slider.on('update', this.props.onUpdate);
    }

    if (this.props.onChange) {
      slider.on('change', this.props.onChange);
    }

    if (this.props.onSlide) {
      slider.on('slide', this.props.onSlide);
    }
    
    const handlersElements = this.sliderContainer.querySelectorAll('.noUi-handle');
    const handlers = [].slice.call(handlersElements);

    handlers.forEach(handle => {
        handle.setAttribute('tabindex', 0);

        handle.addEventListener('click', function(){
            this.focus();
        });

        handle.addEventListener('keydown', function( e ) {
            const step = slider.options.singleStep;

            // Check if it's a multiple handles
            if (slider.options.handles > 1) {
                const currentSliderIndex = e.target.className.indexOf('lower') > -1 ? 0 : 1;
                const values = slider.get();
                let value = Number(values[currentSliderIndex]);

                switch ( e.which ) {
                    case 37: value -= step;
                        break;
                    case 39: value += step;
                        break;
                }

                values[currentSliderIndex] = value;
                return slider.set(values);
            } else {
                const value = Number(slider.get());

                switch ( e.which ) {
                    case 37: slider.set( value - step );
                        break;
                    case 39: slider.set( value + step );
                        break;
                }
            }
        });
    });
  }

  render() {
    return <div ref={slider => {this.sliderContainer = slider;}} />;
  }
}

Nouislider.propTypes = {
  // http://refreshless.com/nouislider/slider-options/#section-animate
  animate: React.PropTypes.bool,
  // http://refreshless.com/nouislider/behaviour-option/
  behaviour: React.PropTypes.string,
  // http://refreshless.com/nouislider/slider-options/#section-Connect
  connect: React.PropTypes.oneOfType([
    React.PropTypes.oneOf(['lower', 'upper']),
    React.PropTypes.bool
  ]),
  // http://refreshless.com/nouislider/slider-options/#section-cssPrefix
  cssPrefix: React.PropTypes.string,
  // http://refreshless.com/nouislider/slider-options/#section-orientation
  direction: React.PropTypes.oneOf(['ltr', 'rtl']),
  // http://refreshless.com/nouislider/more/#section-disable
  disabled: React.PropTypes.bool,
  // http://refreshless.com/nouislider/slider-options/#section-limit
  limit: React.PropTypes.number,
  // http://refreshless.com/nouislider/slider-options/#section-margin
  margin: React.PropTypes.number,
  // http://refreshless.com/nouislider/events-callbacks/#section-change
  onChange: React.PropTypes.func,
  // http://refreshless.com/nouislider/events-callbacks/#section-update
  onSlide: React.PropTypes.func,
  // http://refreshless.com/nouislider/events-callbacks/#section-slide
  onUpdate: React.PropTypes.func,
  // http://refreshless.com/nouislider/slider-options/#section-orientation
  orientation: React.PropTypes.oneOf(['horizontal', 'vertical']),
  // http://refreshless.com/nouislider/pips/
  pips: React.PropTypes.object,
  // http://refreshless.com/nouislider/slider-values/#section-range
  range: React.PropTypes.object.isRequired,
  // http://refreshless.com/nouislider/slider-options/#section-start
  start: React.PropTypes.arrayOf(React.PropTypes.number).isRequired,
  // http://refreshless.com/nouislider/slider-options/#section-step
  step: React.PropTypes.number,
  // http://refreshless.com/nouislider/slider-options/#section-tooltips
  tooltips: React.PropTypes.oneOfType([
    React.PropTypes.bool,
    React.PropTypes.arrayOf(
      React.PropTypes.shape({
        to: React.PropTypes.func
      })
    )
  ])
};

module.exports = Nouislider;
