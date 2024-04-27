import React from 'react';

const MatchedText = ({ text, query }) => {
    const searchTerms = query.toLowerCase().split(' ');
    const regexPattern = new RegExp(`(${searchTerms.join('|')})`, 'gi');
    const highlightedText = text ? text.replace(regexPattern, '<strong>$1</strong>') : '';
    
    return <div dangerouslySetInnerHTML={{ __html: highlightedText }} />;
};

export default MatchedText;
