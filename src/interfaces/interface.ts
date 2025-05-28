// для пользователя в редакс
export interface UserState {
        user_nickName: null | string,
        user_imgUrl: null | string,
        user_role: null | number,
        user_id: null | number,
        user_email: null | string,
        user_blocked: null | number
}

// для селетора пользователя в редаксе
export interface RootState {
        user: UserState;
}

// -----------------------------------------------------------------------------
// --------------------------ДЛЯ ЗАПРОСОВ НА СЕРВЕР-----------------------------
// -----------------------------------------------------------------------------

// интерфейс подарка
export interface Gift {
        id: number | null,
        addData: string | null,
        appreciators: number | null,
        creatorId: number | null,
        name: string | null,
        photoPath: string | null,
        reating: number | null,
        tags: string | null,
        userViews: number | null
}

export interface Tag {
        id: number,
        text: string
}

export interface suggest {
        id: number,
        addData: string,
        creatorId: number,
        name: string
}

export interface suggestForPost {
        creatorId: number,
        name: string,
        description: string,
        tags: string[]
}

export interface giftName{
        name: string
}

export interface admin{
        addData: string,
        admin_level: number,
        bio: string | null,
        email: string,
        id: number,
        imgPath: string | null,
        nickname: string,
        role: number,
        tags: string[] | null,
        user_id: number
}

export interface suggest{
        id: number,
        addDate: string,
        content: string,
        name: string,
        photiPath: null | string,
        tags: string[] | null,
        user_id: string
}

export interface report{
        id: number,
        user_id: number,
        content: string,
        gift_id: number
}