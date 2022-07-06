import AwesomeSlider from 'react-awesome-slider';
import AwsSliderStyles from 'react-awesome-slider/src/core/styles.scss';

const Slider = ({props}) => (
    <AwesomeSlider cssModule={AwsSliderStyles}>
        <div data-src="./images/Big-Ts-Snappers-Board.jpg" />
        <div data-src="./images/Big-Ts-King.JPG" />
        <div data-src="./images/Big-Ts-Grouper.JPG" />
        <div data-src="./images/Big-Ts-Tuna.JPG" />
        <div data-src="./images/Big-Ts-Mahi.jpg" />
    </AwesomeSlider>
);
  
export default Slider;