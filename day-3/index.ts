import FS from 'fs/promises';
import path from 'path';

type InputType = 'input' | 'sample-1' | 'sample-2';

async function get_input(input_file: InputType) {
	return await FS.readFile(path.join(__dirname, input_file), 'utf-8');
}

async function part_1(input_file: InputType) {
	const input = await get_input(input_file);
	const regex = /mul\(\d+\,\d+\)/g;

	const matches = input.match(regex);

	if (!matches) {
		throw new Error('No match found');
	}

	let sum = 0;

	for (let match of matches) {
		const [x, y] = match
			.replace('mul(', '')
			.replace(')', '')
			.split(',')
			.map((n) => parseInt(n));

		sum += x * y;
	}

	return sum;
}

async function part_2(input_file: InputType) {
	const input = await get_input(input_file);
	const regex = /don't\(\)|do\(\)|mul\(\d+\,\d+\)/g;

	const matches = input.match(regex);

	if (!matches) {
		throw new Error('No match found');
	}

	let sum = 0,
		disabled = false;

	for (let match of matches) {
		if (match === 'do()') {
			disabled = false;
			continue;
		}

		if (match === "don't()") {
			disabled = true;
			continue;
		}

		if (disabled) {
			continue;
		}

		const [x, y] = match
			.replace('mul(', '')
			.replace(')', '')
			.split(',')
			.map((n) => parseInt(n));

		sum += x * y;
	}

	return sum;
}

part_2('input').then(console.log);
