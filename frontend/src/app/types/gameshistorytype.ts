export type GamesHistoryType = {
    id: string,
    player_id: string,
    opponent_id: string,
    xp_level: number,
    date: string,
    result: boolean,
    opponent_data: {
        id: string,
        full_name: string,
        nickName: string,
        photo_path: string
    }
}