const config = {
	content: ['./src/**/*.{html,js,svelte,ts}'],

	theme: {
        screens:{
            'sm': '640px',
            'md': '768px',
            'lg': '1024px',
            'xl': '1280px',
            '2xl': '1536px',
            'huge':'1920px',
            'print': {'raw': 'print'},
        },
		extend: {
			colors:{
				purple:{
                    darker:'#431a4d',
                    primary:'#662874',
                    light:'#BCA0C3',
                    lighter:'#E0D6E5'
                },
				gold:{
                    primary:'#ECB28B',
                    light:'#FBF0E8',
                    dark:'#EAAA80'
                },
                green:{
                    primary:'#1A8424'
                }
			},
			height:{
                'ros':'calc(100vh - 120px)',
                'ros-foot':'calc(100vh - 177px)',
                'custom':'540px',
                rosmn:'calc(100vh - 144px)',
            },
            width:{
                'cart':'30rem',
            },
			letterSpacing:{
                'custom':'0.3em'
            },
			boxShadow:{
                xl:'0 5px 25px 0px rgba(0, 0, 0, 0.1), 0 5px 10px 0px rgba(0, 0, 0, 0.04)',
                '2xl': '0 7px 50px -12px rgba(0, 0, 0, 0.25)',
            },
			zIndex: {
                '-10': '-10',
                '40':'40',
                'infinite':'9999'
            },
            fontSize:{
                smallest:'0.6rem'
            },
            maxHeight:{
                'cart':'75vh',
                popup:'800px',
                ros:'calc(100vh - 144px)',
                fullCart:'calc(100vh - 174px)'
            },
		}
	},

	plugins: [
		require('@tailwindcss/forms'),
        require('@tailwindcss/typography'),
        require('@tailwindcss/aspect-ratio'),
	]
};

module.exports = config;
