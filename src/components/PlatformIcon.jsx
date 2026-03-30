import { PLATFORM_LOGOS } from '../constants'

export default function PlatformIcon({ id, size = 20, style = {} }) {
    return <img src={PLATFORM_LOGOS[id]} alt="" style={{ width: size, height: size, ...style }} />
}
