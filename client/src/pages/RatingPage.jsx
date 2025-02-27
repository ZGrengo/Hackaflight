//Iniciamos componente
const RatingPage = () => {
    return (
        <main>
            <h2>Déjanos un comentario!</h2>
            <p>
                Ayúdanos a mejorar nuestra plataforma para poder llevarte cada
                día más lejos al mejor precio.
            </p>
            <section>
                <form>
                    <div>
                        <label htmlFor="title">Título</label>
                        <input type="text" id="title" required />
                    </div>
                    <div>
                        <label htmlFor="rating">Valoración</label>
                        <input
                            type="number"
                            min="1"
                            max="5"
                            id="rating"
                            required
                        />
                    </div>
                    <div>
                        <label htmlFor="comment">Descripción:</label>
                        <textarea name="comment" id="comment">
                            Déjanos tu comentario
                        </textarea>
                        <input type="text" id="comment" required />
                        <button>Enviar valoración</button>
                    </div>
                </form>
            </section>
            <section>
                {/*Listado de valoraciones de más reciente a menos */}
            </section>
        </main>
    );
};

export default RatingPage;
