import React from 'react'
import "./Home.css"
import Product from './Product'

function Home() {
  return (
    <div className='home'>
        <div className='home_container'>
            <img src={require('./images/amazon-banner.jpg')}className='home_image' alt=''></img>

            <div className='home_row'>
              <Product
              id="12312311"
              title="Kindle"
              price={49.99}
              image={require('./images/kindle.jpg')}
              rating={5}
              />
              <Product
              id="12312312"
              title="Kenwood kMix Stand Mixer for Baking, Stylish Kitchen Mixer with K-Beater, Dough Hook and Whisk, 5 Litre Glass Bowl, Removable Splash Guard, 1000 W, Black"
              price={239.99}
              image={require('./images/kenwood.jpg')}
              rating={5}
              />
            </div>

            <div className='home_row'>
            <Product
              id="12312313"
              title="Braun Series 3 Style & Shave Electric Shaver, For Men with Precision Beard Trimmer and 5 Combs, Gifts For Men, UK 2 Pin Plug, 300BT, Black Razor"
              price={39.99}
              image={require('./images/braun.jpg')}
              rating={3}
              />
              <Product
              id="12312314"
              title="LEGO 75312 Star Wars Boba Fett’s Starship Building Toy for Kids Age 9-12, Mandalorian Model Set with 2 Minifigures"
              price={40.98}
              image={require('./images/lego.jpg')}
              rating={5}
              />
              <Product
              id="12312315"
              title="Pirate's Grog Spiced Rum 700ml - Great Taste Award Winner 2020"
              price={32.00}
              image={require('./images/rum.jpg')}
              rating={5}
              />
            </div>

            <div className='home_row'>
            <Product
              id="12312312"
              title="Echo Dot (4th generation) | Smart speaker with Alexa | Charcoal"
              price={24.99}
              image={require('./images/dot.jpg')}
              rating={4}
              />
            </div>
        </div>
    </div>
  )
}

export default Home