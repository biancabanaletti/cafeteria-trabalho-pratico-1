create table cardapio (
    id_item serial primary key,
    nome_item varchar(100) not null,
    preco_unitario decimal(10,2) not null,
    tipo_item varchar(50) not null
);

create table consumidores (
    id_consumidor serial primary key,
    nome_completo varchar(100) not null,
    telefone varchar(20)
);

create table comandas (
    id_comanda serial primary key,
    data_abertura date not null,
    quantidade_itens integer not null,
    id_consumidor integer not null,
    foreign key (id_consumidor) references consumidores(id_consumidor)
);