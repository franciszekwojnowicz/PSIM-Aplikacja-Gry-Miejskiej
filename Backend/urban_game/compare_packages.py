with open('requirements.txt', 'r') as req_file:
    req_packages = {line.split('==')[0].strip() for line in req_file.readlines()}

with open('global_packages.txt', 'r') as glob_file:
    glob_packages = {line.split('==')[0].strip() for line in glob_file.readlines()}

unused_packages = glob_packages - req_packages

print("Global packages not used in requirements.txt:")
for package in sorted(unused_packages):
    print(package)

