import { useMemo } from "react";

const DEFAULT_AVATAR = process.env.REACT_APP_DEFAULT_AVATAR;

export function useProfile(user) {
    const photo = useMemo(
        () => user?.photoUrl || DEFAULT_AVATAR,
        [user?.photoUrl]
    );

    return {
        photo
    };
}
