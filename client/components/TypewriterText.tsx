import { useState, useEffect } from 'react';
import { Text, TextProps } from '@chakra-ui/react';

interface TypewriterTextProps extends TextProps {
  texts: string[];
  typingSpeed?: number;
  deletingSpeed?: number;
  delayBetweenTexts?: number;
}

const TypewriterText: React.FC<TypewriterTextProps> = ({
  texts,
  typingSpeed = 150,
  deletingSpeed = 50,
  delayBetweenTexts = 1000,
  ...props
}) => {
  const [currentTextIndex, setCurrentTextIndex] = useState(0);
  const [currentText, setCurrentText] = useState('');
  const [isDeleting, setIsDeleting] = useState(false);
  const [isWaiting, setIsWaiting] = useState(false);

  useEffect(() => {
    if (texts.length === 0) return;

    let timeout: NodeJS.Timeout;

    if (isWaiting) {
      timeout = setTimeout(() => {
        setIsWaiting(false);
        setIsDeleting(true);
      }, delayBetweenTexts);
      return () => clearTimeout(timeout);
    }

    const currentFullText = texts[currentTextIndex];
    
    if (isDeleting) {
      if (currentText === '') {
        setIsDeleting(false);
        setCurrentTextIndex((prevIndex) => (prevIndex + 1) % texts.length);
      } else {
        timeout = setTimeout(() => {
          setCurrentText(currentFullText.substring(0, currentText.length - 1));
        }, deletingSpeed);
      }
    } else {
      if (currentText === currentFullText) {
        setIsWaiting(true);
      } else {
        timeout = setTimeout(() => {
          setCurrentText(currentFullText.substring(0, currentText.length + 1));
        }, typingSpeed);
      }
    }

    return () => clearTimeout(timeout);
  }, [currentText, currentTextIndex, isDeleting, isWaiting, texts, typingSpeed, deletingSpeed, delayBetweenTexts]);

  return <Text {...props}>{currentText}</Text>;
};

export default TypewriterText;