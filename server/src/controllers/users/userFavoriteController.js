const userFavoriteController = async ( req, res, next ) => {
    try{
        const { userId } = req.user.userId;

        const favorites = await selectUserFavoriteModel(null, userId);
        res.send( {
            status: 'Ok',
            data: {
                favorites,
            },
        } );
    } catch ( err )
    {
        next( err );
    }
};

export default userFavoriteController;
