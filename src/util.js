const PREVIEW_GAMES_SIZE = 640;
const PREVIEW_SCREENSHOTS_SIZE = 1280;

export const smallImage = (imgPath) => {
	const image = imgPath.match(/media\/screenshots/) 
		? imgPath.replace('media/screenshots', `media/resize/${PREVIEW_SCREENSHOTS_SIZE}/-/screenshots`)
		: imgPath.replace('media/games', `media/resize/${PREVIEW_GAMES_SIZE}/-/games`);

	return image;
}