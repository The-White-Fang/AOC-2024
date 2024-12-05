import FS from 'fs/promises';
import path from 'path';

async function get_lists(input_file: InputType) {
	const input = await FS.readFile(path.join(__dirname, input_file), 'utf-8');

	return input
		.split('\n')
		.map(function (line) {
			return line.trim().split('');
		})
		.filter(function (chars) {
			return chars.length;
		});
}

function get_count_start_from(i: number, j: number, input: string[][]) {
	const char = input[i][j];
	let word_horizontal = char,
		word_vertcal = char,
		word_across_right = char,
		word_across_left = char;

	for (let idx = 1; idx < 4; idx++) {
		word_horizontal += input[i]?.[j + idx] ?? '';
		word_vertcal += input[i + idx]?.[j] ?? '';
		word_across_right += input[i + idx]?.[j + idx] ?? '';
		word_across_left += input[i - idx]?.[j + idx] ?? '';
	}

	let count = 0;

	if (word_horizontal.length === 4 && (word_horizontal === 'XMAS' || word_horizontal === 'SAMX')) {
		count++;
	}

	if (word_vertcal.length === 4 && (word_vertcal === 'XMAS' || word_vertcal === 'SAMX')) {
		count++;
	}

	if (word_across_right.length === 4 && (word_across_right === 'XMAS' || word_across_right === 'SAMX')) {
		count++;
	}

	if (word_across_left.length === 4 && (word_across_left === 'XMAS' || word_across_left === 'SAMX')) {
		count++;
	}

	return count;
}

function is_valid_x_mas(i: number, j: number, input: string[][]) {
	const char = input[i][j],
		top_left_char = input[i - 1]?.[j - 1] ?? '',
		top_right_char = input[i - 1]?.[j + 1] ?? '',
		bottom_left_char = input[i + 1]?.[j - 1] ?? '',
		bottom_right_char = input[i + 1]?.[j + 1] ?? '';
	const word_across_right = top_left_char + char + bottom_right_char,
		word_across_left = top_right_char + char + bottom_left_char;

	if (
		word_across_right.length === 3 &&
		word_across_left.length === 3 &&
		(word_across_right === 'MAS' || word_across_right === 'SAM') &&
		(word_across_left === 'MAS' || word_across_left === 'SAM')
	) {
		return true;
	}

	return false;
}

async function part_1(input_file: InputType) {
	const input = await get_lists(input_file);

	let count = 0;

	for (let i = 0; i < input.length; i++) {
		const line = input[i];

		for (let j = 0; j < line.length; j++) {
			const char = line[j];

			if (char !== 'S' && char !== 'X') {
				continue;
			}

			count += get_count_start_from(i, j, input);
		}
	}

	return count;
}

async function part_2(input_file: InputType) {
	const input = await get_lists(input_file);

	let count = 0;

	for (let i = 1; i < input.length - 1; i++) {
		const line = input[i];

		for (let j = 1; j < line.length - 1; j++) {
			const char = line[j];

			if (char !== 'A') {
				continue;
			}

			const is_valid = is_valid_x_mas(i, j, input);

			if (is_valid) {
				count++;
			}
		}
	}

	return count;
}

part_2('input').then(console.log);
