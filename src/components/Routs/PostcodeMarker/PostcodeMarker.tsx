import {CoordinateData} from 'common/hooks/useCSVCoordinate'
import React, {useEffect, useState} from 'react'
import {Marker} from 'react-map-gl'
import {getPostcodeFromPoints} from 'services'
import './PostcodeMarker.css'

interface PostcodeMarkerProps {
  coordinates: CoordinateData[]
}

interface Point {
  longitude: number
  latitude: number
  text: string
}

const PostcodeMarker: React.FC<PostcodeMarkerProps> = ({coordinates}) => {
const [points, setPoints] = useState<Point[]>([])

  useEffect(() => {
    const fetch = async () => {
      if( coordinates[0]) {
        Promise.all(coordinates.map(i => getPostcodeFromPoints(i.from))).then((values) => {
          setPoints(values.map((i, index) => ({
            longitude: coordinates[index].from[0] || 0,
            latitude: coordinates[index].from[1] || 0,
            text: i.features.find(feture => feture?.place_type[0] === 'postcode')?.place_name || i.features.find(feture => feture?.place_type[0] === 'place')?.place_name || 'No data'
          }) ))
        })
      }
    }
    fetch()
  }, [coordinates, setPoints])

  return <>
    {points.map( i => <Marker key={i.longitude + i.latitude} longitude={i.longitude} latitude={i.latitude}>
     <div className='pint'><div className='point__name'>{i.text}</div></div>
    </Marker>)}
  </>
}

export default PostcodeMarker