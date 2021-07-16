import { SiteClient } from 'datocms-client';

export default async function recebedorDeRequets(request, response) {

    if (request.method === 'POST') {

        const TOKEN = '6f07dba93706aaccf82dbead199263';
        const client = new SiteClient(TOKEN);

        console.log(request.body);
        const register = await client.items.create({
            itemType: '974937',
            login: request.body.login,
            avatarUrl: request.body.avatar_url,
            creatorSlug: "teste"
        });

        response.json({
            dados: "ok",
            'register': register
        });
        return;
    }

    response.status(404);
}