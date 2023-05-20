class Utilities {
    hasThumbnail(char) {
        if(char) {
            if(char.indexOf("image_not_available") !== -1) {
                return false
            }
            return true
        }
    }
}

export default Utilities;
