import { useState, useEffect, useRef } from 'react';
import { Dimensions, Image } from 'react-native';

const { width: screenWidth } = Dimensions.get('window');

const useAutoScroll = () => {
    const [imageList, setImageList] = useState([]);
    const [currentImage, setCurrentImage] = useState(0);
    const stepCarousel = useRef(null);

    useEffect(() => {
        const data = [
            {
                image: <Image style={{ width: screenWidth, height: '100%' }} source={require('../../../images/images/imgHome/banner/image1.jpg')} resizeMode='stretch' />,
                type: 'jpg',
            },
            {
                image: <Image style={{ width: screenWidth, height: '100%' }} source={require('../../../images/images/imgHome/banner/image2.jpg')} resizeMode='stretch' />,
                type: 'jpg',
            },
            {
                image: <Image style={{ width: screenWidth, height: '100%' }} source={require('../../../images/images/imgHome/banner/image3.jpg')} resizeMode='stretch' />,
                type: 'jpg',
            },
            {
                image: <Image style={{ width: screenWidth, height: '100%' }} source={require('../../../images/images/imgHome/banner/image4.jpg')} resizeMode='stretch' />,
                type: 'jpg',
            }
        ];

        setImageList(data);
    }, []);

    useEffect(() => {
        if (imageList.length > 0) {
            let index = 0;
            const intervalId = setInterval(() => {
                stepCarousel.current.scrollTo({ x: index * screenWidth, y: 0, animated: true });
                index += 1;
                if (index === imageList.length) {
                    index = 0;
                }
            }, 2000);
            return () => clearInterval(intervalId);
        }
    }, [imageList]);

    const handleScroll = (e) => {
        if (!e) {
            return;
        }
        const { nativeEvent } = e;
        if (nativeEvent && nativeEvent.contentOffset) {
            let imageIndex = 0;
            if (nativeEvent.contentOffset.x > 0) {
                imageIndex = Math.floor((nativeEvent.contentOffset.x + screenWidth / 2) / screenWidth);
            }
            setCurrentImage(imageIndex);
        }
    };

    return { imageList, currentImage, stepCarousel, handleScroll };
};

export default useAutoScroll;
