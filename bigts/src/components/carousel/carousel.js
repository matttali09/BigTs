import AwesomeSlider from 'react-awesome-slider';
import AwsSliderStyles from 'react-awesome-slider/src/core/styles.scss';

const Slider = ({props}) => (
    <AwesomeSlider cssModule={AwsSliderStyles}>
        <div data-src="../../images/Red-Grouper.jpg" />
        <div data-src="../../images/Black-Grouper.JPG" />
        <div data-src="../../images/Wahoo.jpg" />
        <div data-src="../../images/Sail-Fish.JPG" />
        <div data-src="../../images/Mahi.jpg" />
    </AwesomeSlider>
);
  
export default Slider;