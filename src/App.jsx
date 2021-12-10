import { useEffect, useRef, useState } from "react"
import * as htmlToImage from "html-to-image"
import { css } from "@stitches/react"
import Logo from "./components/Logo"
import images from "./images"

const coef = 0.2

const cardStyles = css({
	width: 1920,
	height: 1080,
	background: "black",
	position: "relative",
	overflow: "hidden",
})
const imageStyles = css({
	width: 1920 * coef,
	height: 1080 * coef,
})

// get random value between min and max
function getRandom(min, max) {
	return Math.random() * (max - min) + min
}

// css place randomely element in bounding box
function getRandomPosition() {
	const x = Math.random() * 1920
	const y = Math.random() * 1080
	const rotation = getRandom(-30, 30)
	return {
		left: x - (x % 90),
		top: y - (y % 90),
		transform: `rotate(${rotation}deg)`,
	}
}

export default function App() {
	const ref = useRef(null)
	const [imageSrc, setImageSrc] = useState(null)

	useEffect(() => {
		htmlToImage
			.toPng(ref.current, { cacheBust: true })
			.then((dataUrl) => {
				setImageSrc(dataUrl)
			})
			.catch((err) => {
				console.log(err)
			})
	}, [])

	return (
		<>
			<img src={imageSrc} className={imageStyles()} alt="result" />

			<div style={{}}>
				<div className={cardStyles()} ref={ref}>
					<div className="flex absolute mix-blend-exclusion inset-0 flex-col z-20 items-center justify-center h-full">
						<Logo />
					</div>
					<div className="absolute inset-0 w-full z-10 h-full">
						<div className="relative h-full w-full">
							{images.map((image) => (
								<img key={image} src={image} style={getRandomPosition()} alt="image" className="max-h-64 absolute" />
							))}
						</div>
					</div>
				</div>
			</div>
		</>
	)
}
