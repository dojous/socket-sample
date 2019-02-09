import React from 'react'

export const themeConfig = {
    light: {
        
        bodybg: 'white',
        btn:'black massive ui inverted red basic button',
        animation: 'slideInUp',
        color: '#282c34'
       
       
    },
    dark: {
        bodybg: '#282c34',
        btn: 'massive ui inverted primary basic button',
        animation: 'wobble', 
        color: 'white'
    }
}

const ThemeContext = React.createContext(themeConfig.dark)

export default ThemeContext;