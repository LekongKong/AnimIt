/**
 * Created by b1ncer on 16/7/4.
 */
const linear = t => {
    return t;
};

export default function* generator (start, end, duration, ease) {
    const begin = new Date().getTime();
    while (true) {
        let now = new Date().getTime();
        if (now - begin >= duration) {
            return end;
        }
        yield ease((now - begin) / duration) * (end - start) + start;
    }
}
