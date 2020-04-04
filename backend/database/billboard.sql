CREATE DATABASE billboard;

\connect billboard;


CREATE TABLE tasks (
    id UUID PRIMARY KEY,
    title TEXT NOT NULL,
    user_id TEXT NOT NULL,
    lat REAL NOT NULL,
    lng REAL NOT NULL,
    data JSONB NOT NULL,
    created_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT NOW()
);

INSERT INTO tasks (id, user_id, title, lat, lng, data) VALUES ('0695dba7-f988-4f7c-90cb-6ea4e4956b79', 'mc-test-face', 'Karolinska Universitetssjukhuset', 59.29374, 18.05942, '{}'::JSONB);
INSERT INTO tasks (id, user_id, title, lat, lng, data) VALUES ('b701d32e-ee57-4d4b-a168-a28f9d1bf710', 'mc-test-face', 'Aleris Sports Medicine & Ortopedi', 59.29628, 18.05375, '{}'::JSONB);
INSERT INTO tasks (id, user_id, title, lat, lng, data) VALUES ('3fdebaa1-993d-4400-9b55-a73b8a6b35cd', 'mc-test-face', 'Stockholms Sjukhem', 59.29102, 18.05719, '{}'::JSONB);
INSERT INTO tasks (id, user_id, title, lat, lng, data) VALUES ('8cb87deb-1997-477e-b254-2ca3d8f7844b', 'mc-test-face', 'Smärtrehabiliteringen, Capio S:t Görans Sjukhus', 59.30994, 18.05736, '{}'::JSONB);
INSERT INTO tasks (id, user_id, title, lat, lng, data) VALUES ('6b49d369-5c40-4776-adac-ec18adc05345', 'mc-test-face', 'Capio Sankt Görans Sjukhus', 59.31134, 18.05307, '{}'::JSONB);
INSERT INTO tasks (id, user_id, title, lat, lng, data) VALUES ('9a42dfa1-57e2-42d8-aecf-12f41d6b7351', 'mc-test-face', 'S:t Eriks Ögonsjukhus', 59.33245, 18.01567, '{}'::JSONB);
INSERT INTO tasks (id, user_id, title, lat, lng, data) VALUES ('8c2aa7b5-dc1e-437d-9c7e-6c89d4ee484b', 'mc-test-face', 'Cavalio AB', 59.3335, 18.02048, '{}'::JSONB);
INSERT INTO tasks (id, user_id, title, lat, lng, data) VALUES ('1296f2a2-e411-4b7a-b9ca-8f9e401118b3', 'mc-test-face', 'Ersta sjukhus', 59.33315, 18.03731, '{}'::JSONB);
INSERT INTO tasks (id, user_id, title, lat, lng, data) VALUES ('9720613d-e282-48db-a960-29b51eb3df32', 'mc-test-face', 'Capio Psykiatri Hemlösa', 59.35512, 17.94724, '{}'::JSONB);
INSERT INTO tasks (id, user_id, title, lat, lng, data) VALUES ('a9f60231-814c-4ffc-b006-dd85d38ae920', 'mc-test-face', 'Södersjukhuset Mammografi', 59.40612, 18.03671, '{}'::JSONB);
INSERT INTO tasks (id, user_id, title, lat, lng, data) VALUES ('1f9ba48f-9c7e-4660-a0e0-b367e66cb2f1', 'mc-test-face', 'SCÄ', 59.4042, 18.04805, '{}'::JSONB);
INSERT INTO tasks (id, user_id, title, lat, lng, data) VALUES ('3804cca2-9350-480f-909f-d87c0a79939b', 'mc-test-face', 'Psykiatri Södra Stockholm Affektiv- och ångestmottagning Rosenlund', 59.40036, 18.04564, '{}'::JSONB);
INSERT INTO tasks (id, user_id, title, lat, lng, data) VALUES ('16b19af8-4830-4da1-bbb9-9410ff30bdf8', 'mc-test-face', 'Autismcenter för små barn', 59.40542, 18.02607, '{}'::JSONB);
INSERT INTO tasks (id, user_id, title, lat, lng, data) VALUES ('80b6506f-ec92-4d45-98c8-60f342e29119', 'mc-test-face', 'Närakut Rosenlund', 59.36523, 18.13665, '{}'::JSONB);
INSERT INTO tasks (id, user_id, title, lat, lng, data) VALUES ('6a40238f-7bcd-42d7-8acb-0ee4a333cea5', 'mc-test-face', 'SÖS', 59.36925, 18.14489, '{}'::JSONB);
INSERT INTO tasks (id, user_id, title, lat, lng, data) VALUES ('7bf858b6-c919-49bd-900d-411cc355e019', 'mc-test-face', 'Lilla Erstagården', 59.33689, 18.08754, '{}'::JSONB);
INSERT INTO tasks (id, user_id, title, lat, lng, data) VALUES ('d4b68952-ba63-4111-80a9-8487504f7bcf', 'mc-test-face', 'Habiliteringscenter Söderstaden barn', 59.33706, 18.08239, '{}'::JSONB);
INSERT INTO tasks (id, user_id, title, lat, lng, data) VALUES ('7f525a97-3cf7-48df-b1d4-5af95c647ac9', 'mc-test-face', 'Remeo Stockholm', 59.33566, 18.08548, '{}'::JSONB);
INSERT INTO tasks (id, user_id, title, lat, lng, data) VALUES ('df1f25fd-a3c7-4b2d-a0cd-ddd89fead749', 'mc-test-face', 'Farsta Neurologi', 59.33531, 18.09097, '{}'::JSONB);
INSERT INTO tasks (id, user_id, title, lat, lng, data) VALUES ('514677ae-a365-4321-8fb3-9d4cbbcb4635', 'mc-test-face', 'Hagsätra Vantörs Psykiatriska Heldygnsvård', 59.33461, 18.08445, '{}'::JSONB);
INSERT INTO tasks (id, user_id, title, lat, lng, data) VALUES ('1886fb27-9ec3-4f3a-96c2-f146e52ca8ae', 'mc-test-face', 'Bromma Sjukhus', 59.33584, 18.0793, '{}'::JSONB);
