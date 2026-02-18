/**
 * @type {import('node-pg-migrate').ColumnDefinitions | undefined}
 */
export const shorthands = undefined;

/**
 * @param pgm {import('node-pg-migrate').MigrationBuilder}
 * @param run {() => void | undefined}
 * @returns {Promise<void> | void}
 */
export const up = (pgm) => {
    pgm.createTable("albums", {
        id: {
            type: "VARCHAR(32)",
            primaryKey: true,
        },
        name: {
            type: "TEXT",
            notNull: true,
        },
        year: {
            type: "INTEGER",
            notNull: true,
        },
    });

    pgm.createTable("songs", {
        id: {
            type: "varchar(32)",
            primaryKey: true,
        },
        title: {
            type: "TEXT",
            notNull: true,
        },
        year: {
            type: "INTEGER",
            notNull: true,
        },
        genre: {
            type: "TEXT",
            notNull: true,
        },
        performer: {
            type: "TEXT",
            notNull: true,
        },
        duration: {
            type: "INTEGER",
        },
        album_id: {
            type: "VARCHAR(32)",
            references: "albums",
            onDelete: "CASCADE",
        },
    });

    pgm.createIndex("songs", "album_id");
};

/**
 * @param pgm {import('node-pg-migrate').MigrationBuilder}
 * @param run {() => void | undefined}
 * @returns {Promise<void> | void}
 */

export const down = (pgm) => {
    pgm.dropTable("songs");
    pgm.dropTable("albums");
};
