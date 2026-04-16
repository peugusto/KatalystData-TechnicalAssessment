const flagsData = {
    'd3456521-27f6-420e-90dc-8454e410bb92': 'Argélia',
    'bb98babb-7bc5-405d-9212-81bca6546e50': 'México',
    '33eee4e2-3425-4816-ae7f-0d521d2764cc': 'Marrocos',
    '805c0270-bad9-4ca4-ae38-212d2ec7ee64': 'Sérvia',
    '7cbd4811-3668-470b-a3f1-05239b315a91': 'Chile',
    '72dd9e6f-57ea-48c9-8c68-4718e2d9b1c1': 'Austrália',
    'dc7e4070-0a4a-4278-83a9-185931e4e971': 'Alemanha',
    '39b668f0-48af-49b8-9aff-d1e0a183c81c': 'Itália',
    'd09eb1b1-ff05-4293-842e-119d81f05af1': 'Uruguai',
    '95db61a0-d734-4fdf-b77b-2854a1fa38e9': 'Nigéria',
    '97f752b5-4a22-451d-bbdc-fd1f279a316e': 'Canadá',
    '9fcac5ce-3326-45b4-9096-ebaed7016764': 'Camarões',
    'a0a43625-f5f3-4e6e-8b3c-f600ebafe399': 'França',
    'b30fa7fa-6116-4707-8a05-b94ece845311': 'Indonésia',
    'a2dfb500-027f-4c54-ad48-6ab4aa6307fe': 'Jamaica',
    '2e33774b-1dc9-43a0-bc9d-3371adf770d4': 'Costa do Marfim',
    'bc7a5176-d637-4a8d-8cf4-3c4323de831b': 'Panamá',
    'dbcd3000-b384-4727-8d63-c2cc93499d43': 'Costa Rica',
    '5a440db3-1fea-429d-891a-0474474b7830': 'Espanha',
    '7f127f06-5fa7-4c6c-b6a8-2c04ba4e1fb3': 'Bélgica',
    '746ab702-4d74-4cce-85d1-de840e612349': 'Estados Unidos',
    '8a49e912-0244-44f3-885e-f8237d7f3a27': 'Tunísia',
    '64b3dd62-ba5a-4896-84ec-54135b9a63da': 'Japão',
    '84225cdb-147c-4291-89f8-9782b1b4253c': 'Brasil',
    '3462d792-ab62-4c17-bcaa-01d059897e45': 'Iraque',
    'b15315c7-85c7-47ae-9808-4b6e204c5a91': 'Holanda',
    '876f43aa-b1eb-4ed6-8a0b-cf2912f3769c': 'Gana',
    'd7beecf0-cae0-4738-ad1f-77152f4a4dae': 'Portugal',
    'd529e6b7-b336-492f-a801-883e37927ecd': 'Venezuela',
    '29fbd738-62d8-40ef-a35a-4317a030433a': 'Colômbia',
    '55d4a970-8d82-4097-abc9-d2ad37384b2e': 'Suíça',
    '2b370344-963a-48c9-a5e7-4453c6a53b3f': 'Argentina',
};

export default function getMockedGroups() {
    const allTeams = Object.entries(flagsData).map(([token, nome]) => ({
        token,
        nome
    })) 

    return allTeams
}