import { lutimes } from 'fs';
import FS from 'fs/promises';
import path from 'path';

const UP = '^',
	DOWN = 'v',
	LEFT = '>',
	RIGHT = '<';

async function get_lists(input_file: InputType) {
	const input = await FS.readFile(path.join(__dirname, input_file), 'utf-8');

	return input.split('\n').map((line) => line.split(''));
}

function find_cursor(array: string[][]) {
	for (let i = 0; i < array.length; i++) {
		const line = array[i];
		for (let j = 0; j < line.length; j++) {
			const char = line[j];

			if (char === UP || char === DOWN || char === LEFT || char === RIGHT) {
				return [i, j];
			}
		}
	}

	throw new Error('Cursor not found');
}

async function part_1(input_file: InputType) {
	const input = await get_lists(input_file);

	let [i, j] = find_cursor(input);

	const direction = input[i][j];

	input[i][j] = 'X';
	let count = 1,
		i_inc = direction === LEFT || direction === RIGHT ? 0 : direction === UP ? -1 : 1,
		j_inc = direction === UP || direction === DOWN ? 0 : direction === LEFT ? -1 : 1;

	while (true) {
		i += i_inc;
		j += j_inc;

		const current = input[i]?.[j];

		if (!current) {
			return count;
		}

		if (current !== '#') {
			if (current !== 'X') {
				count++;
				input[i][j] = 'X';
			}

			continue;
		}

		i -= i_inc;
		j -= j_inc;

		if (i_inc === -1) {
			j_inc = 1;
			i_inc = 0;
		} else if (i_inc === 1) {
			j_inc = -1;
			i_inc = 0;
		} else if (j_inc === -1) {
			i_inc = -1;
			j_inc = 0;
		} else {
			i_inc = 1;
			j_inc = 0;
		}
	}
}

async function part_2(input_file: InputType) {}
